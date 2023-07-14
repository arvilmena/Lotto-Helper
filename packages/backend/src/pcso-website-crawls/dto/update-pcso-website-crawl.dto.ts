import { PartialType } from '@nestjs/mapped-types';
import { CreatePcsoWebsiteCrawlDto } from './create-pcso-website-crawl.dto';

export class UpdatePcsoWebsiteCrawlDto extends PartialType(
  CreatePcsoWebsiteCrawlDto,
) {}
