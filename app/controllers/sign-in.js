import Ember from 'ember';
import swal from 'sweetalert';

export default Ember.Controller.extend({

  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  beforeModel: function() {
   return this.get('session').fetch().catch(function() {});
 },

actions:{
  signIn(provider){
    const email = this.get('emailAddress');
    const pwd = this.get('password');
    let controller = this;
    const auth = this.get('firebaseApp').auth();
    auth.signInWithEmailAndPassword(email, pwd).then(()=>{
      this.get('session').open('firebase', {
        provider: provider,
        email: email,
        password: pwd,
      }).then(() => {
        //alert('Logged In');
        // const session = this.get('session');
        const curuser = controller.get('session.currentUser.email');
        //alert(curuser);
        controller.transitionToRoute('game');

    }).catch(function(){
      const isAuth = controller.get('session.isAuthenticated');
      if(isAuth===true){
        //alert('Already Logged Innnnnnn!!!!! Going to Homepage');
        controller.transitionToRoute('game');
      }

    });
      controller.set('emailAddress', null);
      controller.set('password', null);
    }
  ).catch(function(error){
    var errorCode = error.code;
    var errormsg = error.message;


      if (errorCode==='auth/wrong-password') {
        //alert('Please Enter Correct Password');
        swal('Please enter correct credentials. If you need an account use the register link.');
        controller.set('password','');
      }
      else if (errorCode==='auth/user-not-found') {
        //alert('Please Enter Correct Username');
        swal('Please enter correct credentials. If you need an account use the register link.');
        controller.set('emailAddress','');
      }
      else if (errorCode==='auth/argument-error') {
        //alert('Incorrect Details');
        swal('Incorrect Details');
      }
      else{
        //alert(errormsg);
        swal(errormsg);
      }


  });


  },
  // signOut(){
  //   this.get('session').close();
  //   alert('Logged Out');
  //   this.transitionTo('contact');
  // },
}

});
