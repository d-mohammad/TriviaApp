import Ember from 'ember';
import swal from 'sweetalert';

export default Ember.Controller.extend({

firebaseApp: Ember.inject.service(),
  // headerMessage: 'Registering you',
  // responseMessage: '',
  // emailAddress: '',
  //
  // isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  // isDisabled: Ember.computed.not('isValid'),

  actions: {

    saveEmailPwd() {
      let controller = this;
      const email = this.get('emailAddress');
      const password = this.get('password');
      const name = this.get('name');
      const score = '0';
      // const name = this.get('name');
      // const score = 0;
      // const isSignedIn = true;


      // const newUser = this.get('firebaseApp').auth().createUserWithEmailAndPassword('newUser', { email: email, password: password});
      // newUser.save();
      //
      // this.set('responseMessage', `Thank you! We have just saved your email address: ${this.get('emailAddress')}`);
      // this.set('emailAddress', '');

      const auth = this.get('firebaseApp').auth();
        auth.createUserWithEmailAndPassword(email, password).
        then((userResponse) => {
          const user = controller.store.createRecord('users', {
            id: userResponse.uid,
            email: userResponse.email,
            password: userResponse.password
          });
          user.save();
          const saveusers = this.store.createRecord('users', {ident: user.id,
            emailAddress: email,
            name: name,
            password: password,
            score:score
          });
          saveusers.save();
        }).then((saveduser)=>{
          //alert('Registration is complete please login to play');
          swal('Registration is complete please login to play');
          this.transitionToRoute('/sign-in');
          return saveduser;
        }).catch(function(error){
          var errorCode = error.code;
          var errormsg = error.message;
          if(errorCode==='auth/email-already-in-use'){
            //alert('The credentials are in use');
            swal('That account already exists.');
          }
          else if(errorCode==='auth/invalid-email'){
            //alert('Invalid Email');
            swal('Email is invalid');
          }
          else if(errorCode==='auth/weak-password'){
            //alert('Password weak!! Must be atleast 6 characters');
            swal('Try a better password. At Least 6 characters');
          }
          else{
            //alert(errormsg);
            swal(errormsg);
          }
        });
        //
          this.set('emailAddress', '');
          this.set('password', '');
          this.set('name', '');
          //this.transitionToRoute('/sign-in');

    },


  }
});
