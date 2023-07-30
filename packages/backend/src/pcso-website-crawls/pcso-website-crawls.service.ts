import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { LottoResult } from '@prisma/client';
import * as cheerio from 'cheerio';
import puppeteer, { Browser } from 'puppeteer';
import { PrismaService } from '../prisma/prisma.service';
import { logger } from '../utils/logger';
import {
  NEW_LOTTO_RESULT_CREATED,
  NewLottoResultCreatedEvent,
  PCSO_LOTTO_IDS,
} from './constants';
interface LottoResultRaw {
  results: number[];
  drawAt: string;
  jackpotPrice: number;
  winners: number;
}

import { DateTime, Settings } from 'luxon';
import {
  convertPcsoDateToYmd,
  ymdToDateObjAndString,
} from '../utils/date.function';
Settings.defaultZone = 'Asia/Manila';

@Injectable()
export class PcsoWebsiteCrawlsService {
  private readonly logger = logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async recordLottoResults(
    lottoResults: {
      data: LottoResultRaw[];
      pcsoId: number;
    }[],
  ) {
    this.logger.info({
      message: `> Recording lotto results started: ${lottoResults.length} lotto results`,
    });
    const lottos = await this.prisma.lotto.findMany();
    const records: LottoResult[] = [];
    let newRecordCounter = 0;
    for (const lottoResult of lottoResults) {
      const { pcsoId, data } = lottoResult;
      this.logger.info({
        message: `>> Recording lotto result for pcsoId: ${pcsoId} lotto results`,
      });
      for (const lottoResult of data) {
        const lotto = lottos.find((lotto) => lotto.pcsoId === pcsoId);
        if (!lotto) {
          this.logger.error({
            message: `>>> Cannot find pcsoId: ${pcsoId} in the database!`,
          });
          return null;
        }
        const drawAt = ymdToDateObjAndString(
          convertPcsoDateToYmd(lottoResult.drawAt),
        );
        // console.log({ orig: lottoResult.drawAt, result: drawAt });
        let isNewRecord = false;
        const where = {
          lottoId_drawAtString: {
            lottoId: lotto.id,
            drawAtString: drawAt.string,
          },
        };
        const existing = await this.prisma.lottoResult.findUnique({
          where,
          select: { id: true },
        });
        // const existing = await this.prisma.lottoResult.findFirst({
        //   where: {
        //     lottoId: lotto.id,
        //     drawAtString: drawAt.string,
        //   },
        //   select: { id: true },
        // });
        // console.log({ existing });
        if (!existing) {
          isNewRecord = true;
          newRecordCounter = newRecordCounter + 1;
        }
        try {
          const record = await this.prisma.lottoResult.upsert({
            where,
            create: {
              lotto: {
                connect: {
                  id: lotto.id,
                },
              },
              drawAt: drawAt.date,
              drawAtString: drawAt.string,
              jackpotPrize: lottoResult.jackpotPrice,
              winners: lottoResult.winners,
              results: lottoResult.results.map((result) => result),
            },
            update: {
              jackpotPrize: lottoResult.jackpotPrice,
              winners: lottoResult.winners,
              results: lottoResult.results.map((result) => result),
            },
          });
          if (isNewRecord) {
            this.logger.info({
              message: `>>> New Record added id: ${record.id} in the database!`,
            });
            this.eventEmitter.emit(
              NEW_LOTTO_RESULT_CREATED,
              record as NewLottoResultCreatedEvent,
            );
          }
          records.push(record);
        } catch (error) {
          this.logger.error({
            message: `>>> Error trying to upsert: ${lotto.id} - ${
              drawAt.string
            } in the database! ${JSON.stringify(error, null, 2)}`,
          });
          return null;
        }
      }
    }
    this.logger.info({
      message: `>> Total new records: ${newRecordCounter}`,
    });
    return records;
  }
  testDate() {
    const original = '1/3/2023';
    const ymd = convertPcsoDateToYmd(original);
    const date = ymdToDateObjAndString(ymd);
    return {
      original,
      ymd: date.string,
      resultDateToISOString: date.date.toISOString(),
      resultDate: date.date.toJSON(),
      now: DateTime.now(),
      nowInPh: DateTime.now().setZone('Asia/Manila'),
      nowInPhMonth: DateTime.now().setZone('Asia/Manila').monthLong,
      nowInPhDay: DateTime.now().setZone('Asia/Manila').day,
      nowInPhYear: DateTime.now().setZone('Asia/Manila').year,
    };
  }

  test() {
    const html2 = `<table><tbody><tr>
			<th align=""center"" valign=""middle"" scope=""col"">LOTTO GAME</th><th align=""center"" valign=""middle"" scope=""col"">COMBINATIONS</th><th align=""center"" valign=""middle"" scope=""col"">DRAW DATE</th><th align=""center"" valign=""middle"" scope=""col"">JACKPOT (₱)</th><th align=""center"" valign=""middle"" scope=""col"">WINNERS</th>
		</tr><tr>
<td valign=""middle"">Superlotto 6/49</td><td valign=""middle"">42-46-09-04-24-16</td><td align=""center"" valign=""middle"">7/11/2023</td><td align=""right"" valign=""middle"">48,236,471.00</td><td align=""center"" valign=""middle"">0</td>
		</tr><tr>
			<td valign=""middle"">Superlotto 6/49</td><td valign=""middle"">08-45-30-15-27-44</td><td align=""center"" valign=""middle"">7/13/2023</td><td align=""right"" valign=""middle"">53,596,216.20</td><td align=""center"" valign=""middle"">0</td>
		</tr>
	</tbody></table>`;
    return this.parseTable(html2);
  }
  parseTable(html: string | undefined) {
    const lottoResults: LottoResultRaw[] = [];
    if (!html) return lottoResults;
    const $ = cheerio.load(html);

    $('tbody tr').each((index, element) => {
      const columns = $(element).find('td, th');
      const lottoResult: LottoResultRaw = {
        results: [],
        drawAt: '',
        jackpotPrice: 0,
        winners: 0,
      };

      lottoResult.results = columns
        .eq(1)
        .text()
        .split('-')
        .map((num) => parseInt(num, 10));

      lottoResult.drawAt = columns.eq(2).text().trim();

      lottoResult.jackpotPrice = parseFloat(
        columns
          .eq(3)
          .text()
          .replace(/[^0-9.-]+/g, ''),
      );

      lottoResult.winners = parseInt(columns.eq(4).text(), 10);

      if (
        lottoResult.results.length > 0 &&
        lottoResult.results[0] !== null &&
        lottoResult.drawAt !== 'DRAW DATE'
      ) {
        lottoResults.push(lottoResult);
      }
    });

    return lottoResults;
  }

  @Cron('*/20 * * * *')
  async crawl() {
    let browser: Browser | null = null;
    const result: { pcsoId: number; html: string | undefined }[] = [];
    this.logger.info({
      message: 'Crawling PCSO Website...',
    });
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        // headless: false,
      });
      const page = await browser.newPage();

      // Set screen size
      await page.setViewport({ width: 1200, height: 768 });

      await page.goto('https://www.pcso.gov.ph/SearchLottoResult.aspx');
      // await page.waitForTimeout(950);

      const tableResultSelector = 'table.Grid.search-lotto-result-table';
      await page.waitForSelector(tableResultSelector);
      // From Form
      const fromMonthSelector = 'select#cphContainer_cpContent_ddlStartMonth';
      await page.waitForSelector(fromMonthSelector);
      const fromDaySelector = 'select#cphContainer_cpContent_ddlStartDate';
      await page.waitForSelector(fromDaySelector);
      const fromYearSelector = 'select#cphContainer_cpContent_ddlStartYear';
      await page.waitForSelector(fromYearSelector);

      // To Form
      const toMonthSelector = 'select#cphContainer_cpContent_ddlEndMonth';
      await page.waitForSelector(toMonthSelector);
      const toDaySelector = 'select#cphContainer_cpContent_ddlEndDay';
      await page.waitForSelector(toDaySelector);
      const toYearSelector = 'select#cphContainer_cpContent_ddlEndYear';
      await page.waitForSelector(toYearSelector);

      // Lotto Game
      const gameSelector = 'select#cphContainer_cpContent_ddlSelectGame';
      await page.waitForSelector(gameSelector);

      // From form populate
      const currentPhDate = DateTime.now().setZone('Asia/Manila');
      this.logger.info({
        message: `> Using current Date: ${currentPhDate.toFormat(
          'yyyy-MM-dd',
        )}`,
      });
      const daysAgo = currentPhDate.minus({ days: 7 });
      const fromMonthEl = await page.$(fromMonthSelector);
      await fromMonthEl?.select(daysAgo.monthLong ?? '');
      const fromDayEl = await page.$(fromDaySelector);
      await fromDayEl?.select(daysAgo.day.toString());
      const fromYearEl = await page.$(fromYearSelector);
      await fromYearEl?.select(daysAgo.year.toString());
      this.logger.info({
        message: `> Using FROM: ${
          daysAgo.monthLong
        } ${daysAgo.day.toString()} ${daysAgo.year.toString()}`,
      });

      // To Form populate
      const toMonthEl = await page.$(toMonthSelector);
      await toMonthEl?.select('December');
      const toDayEl = await page.$(toDaySelector);
      await toDayEl?.select('31');
      const toYearEl = await page.$(toYearSelector);
      await toYearEl?.select(currentPhDate.year.toString());
      this.logger.info({
        message: `> Using TO: ${currentPhDate.year.toString()}`,
      });

      for (const pcsoId of PCSO_LOTTO_IDS) {
        this.logger.info({
          message: `> Crawling pcsoId : ${pcsoId}`,
        });
        await page.waitForSelector('div.pre-con', { hidden: true });
        // await page.waitForTimeout(1500);
        // Select Corresponding game
        const gameEl = await page.$(gameSelector);
        await gameEl?.select(pcsoId.toString());

        // Search Lotto Button
        const searchButtonSelector =
          'input[type="submit"][value="Search Lotto"]';
        const button = await page.waitForSelector(searchButtonSelector);

        // click submit button
        // await page.waitForTimeout(950);
        await button?.focus();
        // await page.waitForTimeout(950);
        await button?.click();
        // console.log({ button });
        // await new Promise((r) => setTimeout(r, 1000));
        // await button?.click();
        // await page.waitForTim;
        // await new Promise((r) => setTimeout(r, 500));
        // await button?.click();
        // await new Promise((r) => setTimeout(r, 500));
        // await gameEl.press('Enter');
        // await button.press('Enter');

        await page.waitForNetworkIdle({
          timeout: 10000,
          idleTime: 3000,
        });
        const searchTable = await page.waitForSelector(tableResultSelector);
        const html = await searchTable?.evaluate((el) => el.outerHTML);

        result.push({ pcsoId, html });
      }
      await browser.close();

      const response: {
        pcsoId: number;
        data: LottoResultRaw[];
      }[] = [];
      result.forEach((r) => {
        this.logger.info({
          message: `> Parsing Html for pcsoId : ${r.pcsoId}`,
        });
        const { pcsoId } = r;
        // const data = [this.parseTable(html)[0]];
        const data = this.parseTable(r.html);
        response.push({ pcsoId, data });
      });
      // record lotto results
      const final = await this.recordLottoResults(response);
      this.logger.info({
        message: `> Crawl ends...`,
      });
      return final;
    } catch (error: unknown) {
      await browser?.close();
      this.logger.error(error);
      console.log({ error });
      return (
        'Failed crawling: ' + (error as { message?: string })?.message ??
        'Unknown error'
      );
    }
  }
}
