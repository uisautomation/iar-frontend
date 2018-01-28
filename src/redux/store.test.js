import '../test/mock-localstorage';
import configureStore from './store';

test('creating store succeeds', () => {
  return configureStore().then(({store}) => {
    expect(store).toBeDefined();
  });
});
