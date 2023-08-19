# stuff todo atm

 - finish ui for **history page** (the component is created but i havent tested yet so its random colors and potentially wrong structure)

 - add a button to the weekly page that opens a camera modal and **upload the image** from there

 - integrate auth (more or less not done. all the libs we should need are install such as react-native-sensitive-info and react-native-app-auth. we need to write the part that **calls the auth prompt** in ./src/tabs/auth.js . also need to **integrate calls to getting this data** with the frontend which is statically generated as of now. pretty simple just use effect and set a state for the data)

 - push notifications lib is installed and linked for ios. having an issue with **broken plist** (thats what im leaving on as im writing this)

 - also remove **settings tab** cuz we cant afford to do extra work