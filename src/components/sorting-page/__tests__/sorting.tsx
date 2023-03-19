import { checkedRadio } from "../../../types/types";
import { sortingArray } from "../../../utils/algorithms/sorting";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {

  it("сортировка выборов, по возрастанию, пустой массив", () => {
    const newMas = sortingArray([], checkedRadio.Choice, "По возрастанию");
    expect(newMas[newMas.length-1].mas).toEqual([]);
  })

  it("сортировка выборов, по возрастанию, массив из одного элемента", () => {
    const newMas = sortingArray([2], checkedRadio.Choice, "По возрастанию");
    expect(newMas[newMas.length-1].mas).toEqual([2]);
  })

  it("сортировка выборов, по возрастанию, массив из нескольких элементов", () => {
    const newMas = sortingArray([2, 1, 78, 4, 0], checkedRadio.Choice, "По возрастанию");
    expect(newMas[newMas.length-1].mas).toEqual([0, 1, 2, 4, 78]);
  })

  it("сортировка выборов, по убыванию, массив из нескольких элементов", () => {
    const newMas = sortingArray([2, 1, 78, 4, 0], checkedRadio.Choice, "По убыванию");
    expect(newMas[newMas.length-1].mas).toEqual([78, 4, 2, 1, 0]);
  })

  it("сортировка пузырьком, по возрастанию, пустой массив", () => {
    const newMas = sortingArray([], checkedRadio.Bubble, "По возрастанию");
    expect(newMas[newMas.length-1].mas).toEqual([]);
  })

  it("сортировка пузырьком, по возрастанию, массив из одного элемента", () => {
    const newMas = sortingArray([2], checkedRadio.Bubble, "По возрастанию");
    expect(newMas[newMas.length-1].mas).toEqual([2]);
  })

  it("сортировка пузырьком, по возрастанию, массив из нескольких элементов", () => {
    const newMas = sortingArray([2, 1, 78, 4, 0], checkedRadio.Bubble, "По возрастанию");
    expect(newMas[newMas.length-1].mas).toEqual([0, 1, 2, 4, 78]);
  })

  it("сортировка пузырьком, по убыванию, массив из нескольких элементов", () => {
    const newMas = sortingArray([2, 1, 78, 4, 0], checkedRadio.Bubble, "По убыванию");
    expect(newMas[newMas.length-1].mas).toEqual([78, 4, 2, 1, 0]);
  })

})
