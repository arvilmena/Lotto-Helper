import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import puppeteer, { Browser } from 'puppeteer';
interface LottoResult {
  results: number[];
  drawAt: string;
  jackpotPrice: number;
  winners: number;
}
@Injectable()
export class PcsoWebsiteCrawlsService {
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
  parseTable(html: string) {
    const $ = cheerio.load(html);
    const lottoResults: LottoResult[] = [];

    console.log($('tbody tr').length);

    $('tbody tr').each((index, element) => {
      const columns = $(element).find('td, th');
      const lottoResult: LottoResult = {
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

  async crawl() {
    let browser: Browser | null = null;
    const result: { pcsoId: number; html: string }[] = [];
    try {
      browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();

      // Set screen size
      await page.setViewport({ width: 1200, height: 768 });

      await page.goto('https://www.pcso.gov.ph/SearchLottoResult.aspx');
      await page.waitForTimeout(950);

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
      const fromMonthEl = await page.$(fromMonthSelector);
      await fromMonthEl?.select('January');
      const fromDayEl = await page.$(fromDaySelector);
      await fromDayEl?.select('1');
      const fromYearEl = await page.$(fromYearSelector);
      await fromYearEl?.select(new Date().getFullYear().toString());

      // To Form populate
      const toMonthEl = await page.$(toMonthSelector);
      await toMonthEl?.select('December');
      const toDayEl = await page.$(toDaySelector);
      await toDayEl?.select('31');
      const toYearEl = await page.$(toYearSelector);
      await toYearEl?.select(new Date().getFullYear().toString());

      for (const pcsoId of [1, 2, 17, 18]) {
        await page.waitForSelector('div.pre-con', { hidden: true });
        await page.waitForTimeout(1500);
        // Select Corresponding game
        const gameEl = await page.$(gameSelector);
        await gameEl?.select(pcsoId.toString());

        // Search Lotto Button
        const searchButtonSelector =
          'input[type="submit"][value="Search Lotto"]';
        const button = await page.waitForSelector(searchButtonSelector);

        // click submit button
        await page.waitForTimeout(950);
        await button.focus();
        await page.waitForTimeout(950);
        await button.click();
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
        data: LottoResult[];
      }[] = [];
      Object.keys(result).forEach((key) => {
        const { pcsoId, html } = result[key];
        const data = this.parseTable(html);
        response.push({ pcsoId, data });
      });
      return response;
    } catch (error) {
      await browser?.close();
      console.log({ error });
      return 'Failed crawling: ' + error?.message ?? 'Unknown error';
    }
  }
}
