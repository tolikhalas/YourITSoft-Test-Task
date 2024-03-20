import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseModuleConfig } from './database.config';

describe('DatabaseConfig', () => {
  let dataSource: DataSource;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          // Setup your '.env.test' file
          envFilePath: '.env.test.local',
        }),
        TypeOrmModule.forRootAsync({
          useFactory: DatabaseModuleConfig,
          inject: [ConfigService],
        }),
      ],
    }).compile();

    dataSource = module.get<DataSource>(getDataSourceToken());
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should establish a database connection', async () => {
    const isConnected = dataSource.isInitialized;
    expect(isConnected).toBe(true);
  });

  it('should load database credentials from environment variables', () => {
    const dbHost = configService.getOrThrow('DB_HOST');
    const dbPort = configService.getOrThrow('DB_PORT');
    const dbDatabase = configService.getOrThrow('DB_DATABASE');
    const dbUsername = configService.getOrThrow('DB_USERNAME');
    const dbPassword = configService.getOrThrow('DB_PASSWORD');
    const dbSynchronize = configService.getOrThrow('DB_SYNCHRONIZE');

    expect(dbHost).toBeDefined();
    expect(dbPort).toBeDefined();
    expect(dbDatabase).toBeDefined();
    expect(dbUsername).toBeDefined();
    expect(dbPassword).toBeDefined();
    expect(dbSynchronize).toBeDefined();
  });
});
