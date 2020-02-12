import { Container } from 'typedi';
import LoggerInstance from './loggers.loader';

export default function dependencyInjector(mongoConnection: any, models: Array<{name:string, model: any}> ) {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        Container.set('LoggerInstance', LoggerInstance);
        Container.set('mongoConnection', mongoConnection);
    }catch (e) {
      LoggerInstance.error(e.message)
    }
}
