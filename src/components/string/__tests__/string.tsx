import { permutation } from "../../../utils/algorithms/string";

describe("Тестирование алгоритма разворота строки", () => {
  it('с чётным количеством символов', () => {
    const newMas = permutation(['1','2','3','4']);
		expect(newMas[newMas.length-1].mas).toEqual(['4', '3', '2', '1']);
	});

  it('с нечетным количеством символов', () => {
    const newMas = permutation(['1','2','3']);
		expect(newMas[newMas.length-1].mas).toEqual(['3', '2', '1']);
	});

  it('с одним символом', () => {
    const newMas = permutation(['1']);
		expect(newMas[newMas.length-1].mas).toEqual(['1']);
	});

  it('пустую строку', () => {
    const newMas = permutation([]);
		expect(newMas[newMas.length-1].mas).toEqual([]);
	});
})
