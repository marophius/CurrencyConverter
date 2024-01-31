import { BeforeBarPipe } from './before-bar.pipe';

describe('BeforeBarPipe', () => {
  let pipe: BeforeBarPipe;

  beforeEach(() => {
    pipe = new BeforeBarPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the string before the first occurrence of "/"', () => {
    const result = pipe.transform('Libra Esterlina/Real Brasileiro');
    expect(result).toEqual('Libra Esterlina');
  });

  it('should return the same string if there is no "/"', () => {
    const result = pipe.transform('Dólar Americano');
    expect(result).toEqual('Dólar Americano');
  });

  it('should return an empty string if input is an empty string', () => {
    const result = pipe.transform('');
    expect(result).toEqual('');
  });

  it('should return the string before the first occurrence of "/" with additional "/" in the string', () => {
    const result = pipe.transform('Libra Esterlina/Real/Brasileiro');
    expect(result).toEqual('Libra Esterlina');
  });

  it('should return the string before the first occurrence of "/" with multiple "/" in the string', () => {
    const result = pipe.transform('Libra/Esterlina/Real/Brasileiro');
    expect(result).toEqual('Libra');
  });
});