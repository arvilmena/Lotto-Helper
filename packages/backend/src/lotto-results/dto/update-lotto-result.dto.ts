import { PartialType } from '@nestjs/mapped-types';
import { CreateLottoResultDto } from './create-lotto-result.dto';

export class UpdateLottoResultDto extends PartialType(CreateLottoResultDto) {}
