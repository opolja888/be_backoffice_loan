import { createLogger, format, transports } from 'winston';
// import ElasticsearchTransport from 'winston-elasticsearch';

// const esTransportOpts = {
//   level: 'info',
//   clientOpts: { 
//     node: 'http://localhost:9200',
//   },
//   indexPrefix: 'nestjs-logs',
// };

// const esTransport = new ElasticsearchTransport(esTransportOpts);

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  transports: [
    new transports.Console(),
    // esTransport
  ],
});