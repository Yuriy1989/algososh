import { DELAY_IN_MS } from '../../src/constants/delays';

const stringTest:string = 'switch';

describe('Строка', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('Проверьте, что строка разворачивается корректно', () => {
    cy.get('input[name="text"]').type(stringTest).should('have.value', stringTest)
    cy.get('button[type="submit"]').click()
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get('div[class^="circle_circle"]').should('have.length', stringTest.length)

    for (let i = 0; i < stringTest.length; i++) {
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')').contains(stringTest[i])
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')>div[class^="circle"]')
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
    }

    cy.wait(DELAY_IN_MS)

    cy.get('div[class^="string_circle"]>div:first-child').contains(stringTest[0])
    cy.get('div[class^="string_circle"]>div:first-child>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    for (let i = 2; i < stringTest.length-1; i++) {
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')').contains(stringTest[i])
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')>div[class^="circle"]')
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
    }

    cy.get('div[class^="string_circle"]>div:last-child').contains(stringTest[stringTest.length-1])
    cy.get('div[class^="string_circle"]>div:last-child>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.wait(DELAY_IN_MS)

    //проверяем символы
    cy.get('div[class^="string_circle"]>div:first-child').contains(stringTest[stringTest.length-1])
    for (let i = 2; i < stringTest.length-2; i++) {
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')').contains(stringTest[i])
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')').contains(stringTest[i])
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')').contains(stringTest[i])
      cy.get('div[class^="string_circle"]>div:nth-child(' + (i + 1) + ')').contains(stringTest[i])
    }
    cy.get('div[class^="string_circle"]>div:last-child').contains(stringTest[0])

    //проверяем классы
    cy.get('div[class^="string_circle"]>div:nth-child(1)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(2)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.get('div[class^="string_circle"]>div:nth-child(3)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
    cy.get('div[class^="string_circle"]>div:nth-child(4)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))

    cy.get('div[class^="string_circle"]>div:nth-child(' + (stringTest.length - 1) + ')>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.get('div[class^="string_circle"]>div:nth-child(' + (stringTest.length) + ')>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'))

    cy.wait(DELAY_IN_MS)

    //проверяем символы
    cy.get('div[class^="string_circle"]>div:first-child').contains(stringTest[stringTest.length-1])
    cy.get('div[class^="string_circle"]>div:nth-child(2)').contains(stringTest[4])
    cy.get('div[class^="string_circle"]>div:nth-child(3)').contains(stringTest[2])
    cy.get('div[class^="string_circle"]>div:nth-child(4)').contains(stringTest[3])
    cy.get('div[class^="string_circle"]>div:nth-child(5)').contains(stringTest[1])
    cy.get('div[class^="string_circle"]>div:last-child').contains(stringTest[0])

    //проверяем классы
    cy.get('div[class^="string_circle"]>div:nth-child(1)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(2)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(3)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))
    cy.get('div[class^="string_circle"]>div:nth-child(4)>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.get('div[class^="string_circle"]>div:nth-child(' + (stringTest.length - 1) + ')>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(' + (stringTest.length) + ')>div[class^="circle"]')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'))

    cy.wait(DELAY_IN_MS)

    //проверяем символы
    cy.get('div[class^="string_circle"]>div:first-child').contains(stringTest[stringTest.length-1])
    cy.get('div[class^="string_circle"]>div:nth-child(2)').contains(stringTest[4])
    cy.get('div[class^="string_circle"]>div:nth-child(3)').contains(stringTest[3])
    cy.get('div[class^="string_circle"]>div:nth-child(4)').contains(stringTest[2])
    cy.get('div[class^="string_circle"]>div:nth-child(5)').contains(stringTest[1])
    cy.get('div[class^="string_circle"]>div:last-child').contains(stringTest[0])

    //проверяем классы
    cy.get('div[class^="string_circle"]>div:nth-child(1)>div[class^="circle"]')
    .invoke('attr', 'class')
    .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(2)>div[class^="circle"]')
    .invoke('attr', 'class')
    .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(3)>div[class^="circle"]')
    .invoke('attr', 'class')
    .then(classList => expect(classList).contains('circle_modified'))
    cy.get('div[class^="string_circle"]>div:nth-child(4)>div[class^="circle"]')
    .invoke('attr', 'class')
    .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(' + (stringTest.length - 1) + ')>div[class^="circle"]')
    .invoke('attr', 'class')
    .then(classList => expect(classList).contains('circle_modified'))

    cy.get('div[class^="string_circle"]>div:nth-child(' + (stringTest.length) + ')>div[class^="circle"]')
    .invoke('attr', 'class')
    .then(classList => expect(classList).contains('circle_modified'))

    cy.wait(DELAY_IN_MS)

  })
})
