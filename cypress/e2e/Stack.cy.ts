import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const stringTestOne: string = "test"
const stringTestTwo: string = "tset"

describe('Стек', () => {
  beforeEach(() => {
    cy.visit('/stack')
  })

  it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('div[class^="stack_button"]>button:first-child').should('be.disabled')
  })

  it('Проверка правильности добавления элемента в стек. Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно', () => {
    cy.get('input[name="text"]').type(stringTestOne).should('have.value', stringTestOne)
    cy.get('div[class^="stack_button"]>button:first-child').click()
    cy.get('div[class^="circle_content"]>div:nth-child(2)').contains(stringTestOne)
    cy.get('div[class^="circle_content"]>div:first-child').contains('top')
    cy.get('div[class^="circle_content"]>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="circle_content"]>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('input[name="text"]').type(stringTestTwo).should('have.value', stringTestTwo)
    cy.get('div[class^="stack_button"]>button:first-child').click()
    cy.get('div[class^="circle_content"]>div:nth-child(2)').contains(stringTestTwo)
    cy.get('div[class^="circle_content"]:first-child>div:first-child').should('be.empty')
    cy.get('div[class^="circle_content"]:nth-child(2)>div:first-child').should('have.text', 'top')
    cy.get('div[class^="circle_content"]:nth-child(2)>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="circle_content"]:nth-child(2)>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })

  it('Проверка правильности удаления элемента из стека.', () => {
    cy.get('input[name="text"]').type(stringTestOne).should('have.value', stringTestOne)
    cy.get('div[class^="stack_button"]>button:first-child').click();
    cy.get('div[class^="stack_button"]>button:nth-child(2)').click();
    cy.get('div[class^="circle_content"]').should('not.exist')
    cy.wait(SHORT_DELAY_IN_MS)
  })

  it('Проверка поведение кнопки «Очистить». Добавление в стек несколько элементов, а по нажатию на кнопку «Очистить» длина стека должна быть равна 0.', () => {
    cy.get('input[name="text"]').type(stringTestOne).should('have.value', stringTestOne)
    cy.get('div[class^="stack_button"]>button:first-child').click();
    cy.get('input[name="text"]').type(stringTestTwo).should('have.value', stringTestTwo)
    cy.get('div[class^="stack_button"]>button:first-child').click();
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('button[type="reset"]').click();
    cy.get('div[class^="stack_button"]>button:first-child').should('be.disabled')
    cy.get('div[class^="stack_button"]>button:nth-child(2)').should('be.disabled')
    cy.get('button[type="reset"]').should('be.disabled')
    cy.get('div[class^="circle_content"]').should('not.exist')
  })

})
