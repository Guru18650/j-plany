import { Keystore, AccountTools, registerAccount, VulcanHebe} from 'vulcan-api-js'
import fs from 'fs'

export async function load() {

    /*Register keystore and login
    const keystore = new Keystore();
    await keystore.init();
    fs.writeFileSync("keystore.json", keystore.dumpToJsonString(), { encoding: 'utf-8' });

    const keystore = new Keystore();
    keystore.loadFromJsonString(fs.readFileSync("keystore.json", { encoding: 'utf-8' }));
    const account = await registerAccount(keystore, "3S1UT8F", "katowice", "857247");
    fs.writeFileSync("account.json", AccountTools.dumpToJsonString(account), { encoding: 'utf-8' });
    */
   
    const keystore = await new Keystore();
    keystore.loadFromJsonString(fs.readFileSync("keystore.json", { encoding: 'utf-8' }));

    const client = await new VulcanHebe(keystore, AccountTools.loadFromJsonString(fs.readFileSync("account.json", { encoding: 'utf-8' })));
    
    await client.getStudents().then(students => {
        students.forEach(student => {
          console.log(student)  
        })
    })
}
