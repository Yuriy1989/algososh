import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const stringTestOne: string = "test"
const indexTest: string = "3"
const lists: Array<string | number> = ["0", "34", "8", "1"];
const SHORT_DELAY_IN_MS_FOR_TEST = 3000

describe('Список', () => {
  beforeEach(() => {
    cy.visit('/list')
  })

  it('Проверка, что если в инпутах пусто, то кнопка добавления и удаления по индексу недоступны', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('input[name="index"]').should('have.value', '')
    cy.get('div[class^="list_button"]>button:first-child').should('be.disabled')
    cy.get('div[class^="list_button"]>button:nth-child(2)').should('be.disabled')
    cy.get('div[class^="list_formIndex"]>button:nth-child(2)').should('be.disabled')
    cy.get('div[class^="list_formIndex"]>button:nth-child(3)').should('be.disabled')
  })

  it('Проверка корректности отрисовки дефолтного списка', () => {
    for(let i = 0; i < lists.length; i++) {
      cy.get('div[class^="list_circles"]>div:nth-child('+(i+1)+')>div:first-child>div:nth-child(2)>p').should('have.text', lists[i])
    }
    cy.get('div[class^="list_circles"]>div:first-child').contains('head')
    cy.get('div[class^="list_circles"]>div:last-child').contains('tail')
  })

  it('Проверка корректности добавления элемента в head.', () => {
    cy.get('input[name="text"]').type(stringTestOne).should('have.value', stringTestOne)
    cy.get('div[class^="list_button"]>button:first-child').click()
    const newLists = [...lists]
    newLists.unshift(stringTestOne)
    cy.wait(SHORT_DELAY_IN_MS);

    for(let i = 0; i < newLists.length; i++) {
      cy.get('div[class^="list_circles"]>div:nth-child('+(i+1)+')>div:first-child>div:nth-child(2)>p').should('have.text', newLists[i])
    }
    cy.get('div[class^="list_circles"]>div:first-child').contains('head')
    cy.get('div[class^="list_circles"]>div:last-child').contains('tail')

    cy.wait(SHORT_DELAY_IN_MS);
  })

  it('Проверка корректности добавления элемента в tail.', () => {
    cy.get('input[name="text"]').type(stringTestOne).should('have.value', stringTestOne)
    cy.get('div[class^="list_button"]>button:nth-child(2)').click()
    const newLists = [...lists]
    newLists.push(stringTestOne)
    cy.wait(SHORT_DELAY_IN_MS);

    for(let i = 0; i < newLists.length; i++) {
      cy.get('div[class^="list_circles"]>div:nth-child('+(i+1)+')>div:first-child>div:nth-child(2)>p').should('have.text', newLists[i])
    }
    cy.get('div[class^="list_circles"]>div:first-child').contains('head')
    cy.get('div[class^="list_circles"]>div:last-child').contains('tail')

    cy.wait(SHORT_DELAY_IN_MS);
  })

  it('Проверка корректности добавления элемента по индексу.', () => {
    cy.get('input[name="text"]').type(stringTestOne).should('have.value', stringTestOne)
    cy.get('input[name="index"]').type(indexTest).should('have.value', indexTest)
    cy.get('div[class^="list_formIndex"]>button:nth-child(2)').click()
    const newLists = [...lists]
    newLists.splice(Number(indexTest), 0, stringTestOne)
    cy.wait(SHORT_DELAY_IN_MS);

    for(let i = 0; i < newLists.length; i++) {
      cy.get('div[class^="list_circles"]>div:nth-child('+(i+1)+')>div:first-child>div:nth-child(2)>p').should('have.text', newLists[i])
    }
    cy.get('div[class^="list_circles"]>div:first-child').contains('head')
    cy.get('div[class^="list_circles"]>div:last-child').contains('tail')

    cy.wait(SHORT_DELAY_IN_MS);
  })

  it('Проверка корректности удаления элемента из head.', () => {
    cy.get('div[class^="list_button"]>button:nth-child(3)').click()
    const newLists = [...lists]
    newLists.shift()
    cy.wait(SHORT_DELAY_IN_MS);

    for(let i = 0; i < newLists.length; i++) {
      cy.get('div[class^="list_circles"]>div:nth-child('+(i+1)+')>div:first-child>div:nth-child(2)>p').should('have.text', newLists[i])
    }
    cy.get('div[class^="list_circles"]>div:first-child').contains('head')
    cy.get('div[class^="list_circles"]>div:last-child').contains('tail')

    cy.wait(SHORT_DELAY_IN_MS);
  })

  it('Проверка корректности удаления элемента из tail.', () => {
    cy.get('div[class^="list_button"]>button:nth-child(4)').click()
    const newLists = [...lists]
    newLists.pop()
    cy.wait(SHORT_DELAY_IN_MS);

    for(let i = 0; i < newLists.length; i++) {
      cy.get('div[class^="list_circles"]>div:nth-child('+(i+1)+')>div:first-child>div:nth-child(2)>p').should('have.text', newLists[i])
    }
    cy.get('div[class^="list_circles"]>div:first-child').contains('head')
    cy.get('div[class^="list_circles"]>div:last-child').contains('tail')

    cy.wait(SHORT_DELAY_IN_MS);
  })

  it('Проверка корректности удаления элемента по индексу.', () => {
    cy.get('input[name="index"]').type(indexTest).should('have.value', indexTest)
    cy.get('div[class^="list_formIndex"]>button:nth-child(3)').click()
    const newLists = [...lists]
    newLists.splice(Number(indexTest), 1)
    cy.wait(SHORT_DELAY_IN_MS_FOR_TEST);

    for(let i = 0; i < newLists.length; i++) {
      cy.get('div[class^="list_circles"]>div:nth-child('+(i+1)+')>div:first-child>div:nth-child(2)>p').should('have.text', newLists[i])
    }
    cy.get('div[class^="list_circles"]>div:first-child').contains('head')
    cy.get('div[class^="list_circles"]>div:last-child').contains('tail')
  })

})
