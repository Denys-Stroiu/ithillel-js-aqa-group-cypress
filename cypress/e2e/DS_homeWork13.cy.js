describe("Book shop", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      if (err.message.trim().includes("Script error.")) {
        return false;
      }
    });
  });

  it("Book shop intercept", () => {
    cy.intercept("GET", "/BookStore/v1/Book?ISBN=*", {
      body: {
        isbn: "test isbn",
        title: "test title",
        subTitle: "test ssubTitle",
        author: "test author",
        publish_date: "2024-01-04T08:48:39.000Z",
        publisher: "test publisher",
        pages: 150,
        description: "test descripton",
        website: "http://test.com/book.html",
      },
    });

    cy.visit("https://demoqa.com/books");
    cy.get(".rt-table .rt-tbody .rt-tr-group a").eq(0).click();
    cy.get("#ISBN-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "test isbn"
    );
    cy.get("#title-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "test title"
    );
    cy.get("#subtitle-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "test ssubTitle"
    );
    cy.get("#author-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "test author"
    );
    cy.get("#publisher-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "test publisher"
    );
    cy.get("#pages-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "150"
    );
    cy.get("#description-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "test descripton"
    );
    cy.get("#website-wrapper > .col-md-9 > #userName-value").should(
      "contain.text",
      "http://test.com/book.html"
    );
  });

  it("Book shop request with data check", () => {
    cy.request({
      url: 'https://demoqa.com/BookStore/v1/Book',
      qs: {
        ISBN: '9781449325862'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);

      expect(resp.body.author).to.eq('Richard E. Silverman');
      expect(resp.body.isbn).to.eq('9781449325862');
      expect(resp.body.title).to.eq('Git Pocket Guide');
      expect(resp.body.subTitle).to.eq('A Working Introduction');
      expect(resp.body.author).to.eq('Richard E. Silverman');
      expect(resp.body.publisher).to.eq("O'Reilly Media");
      expect(resp.body.pages).to.eq(234);
      expect(resp.body.description).to.eq('This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp');
      expect(resp.body.website).to.eq('http://chimera.labs.oreilly.com/books/1230000000561/index.html');
    });
  });
});


