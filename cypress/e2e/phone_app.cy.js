/* eslint-disable no-undef */
describe("Phone App CI/CD", function () {
  beforeEach(function () {
    cy.visit("");
  });
  it("front page can be opened", function () {
    cy.contains("Phonebook");
    cy.contains("filter shown with");
    cy.contains("Add a New");
    cy.contains("Numbers");
    cy.contains("Puhelinmuistio ( FullStackOpen harjoitus ), Hakkis 1/2024");
  });
});
