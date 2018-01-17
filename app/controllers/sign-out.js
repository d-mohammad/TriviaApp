import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),

  beforeModel: function() {
    return this.get('session').fetch().catch(function() {
    });
  },

actions:{
  signOut: function() {
    //let controller = this;
    // const auth = this.get('firebaseApp').auth();
    // const curuser = controller.get('session.currentUser.email');
    // alert(curuser);
    // auth.signOut().then(function(){
      this.get('session').close().then(() => {
      this.store.unloadAll();
      // this.replaceWith('index');
      //alert('Logged Out');
      swal('Succesfully logged out. Thanks for Playing!')
      this.transitionToRoute('index');
    // })

  }).catch(function(error){
    let errorCode = error.code;
    let errormsg = error.message;
    if(errorCode){
      alert(errorCode);
    }
    else{
      alert(errormsg);
    }
  });
  },
}
});
