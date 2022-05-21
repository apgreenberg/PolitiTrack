import { AllUserData } from './userInterfaces';

/*
The internal database
This will begin empty and the user will add data to it as they use the app
It will contain the same information as the external database, using AsyncStorage
Since AsyncStorage only stores strings, we must also store a more the data in a more readily available format
*/
const InternalDatabase: AllUserData = {
  users: [],
};

export default InternalDatabase;
