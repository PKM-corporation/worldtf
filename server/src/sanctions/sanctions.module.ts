import { Module } from '@nestjs/common';
import { SanctionsService } from './sanctions.service';

@Module({
    imports: [],
    providers: [SanctionsService],
    exports: [SanctionsService],
})
export class SanctionsModule {}
