import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const numberTest:string = '5';

describe('Фибоначи', () => {
  beforeEach(() => {
    cy.visit('/fibonacci')
  })

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="numbers"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('Проверьте, что числа генерируются корректно', () => {
    cy.get('input[name="numbers"]').type(numberTest).should('have.value', numberTest);
    cy.get('button[type="submit"]').click()
    cy.get('input[name="numbers"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="fibonacci_circle"]>div:first-child').contains('1')

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="fibonacci_circle"]>div:first-child').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(2)').contains('1')

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="fibonacci_circle"]>div:first-child').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(2)').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(3)').contains('2')

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="fibonacci_circle"]>div:first-child').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(2)').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(3)').contains('2')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(4)').contains('3')

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="fibonacci_circle"]>div:first-child').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(2)').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(3)').contains('2')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(4)').contains('3')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(5)').contains('5')

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="fibonacci_circle"]>div:first-child').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(2)').contains('1')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(3)').contains('2')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(4)').contains('3')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(5)').contains('5')
    cy.get('div[class^="fibonacci_circle"]>div:nth-child(6)').contains('8')
  })

})
