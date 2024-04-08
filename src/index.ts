import {app} from "./app";
import {SETTINGS} from "./settings";

app.listen(SETTINGS.PORT, () => {
    console.log(`....started server on the ${SETTINGS.PORT}`)
})