if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("On Startup",function(){
      it("Should be able to create a new Customer",function(){
        chai.assert(Meteor.call('addCustomer','Test Customer'));
      })
    })
  });
}
