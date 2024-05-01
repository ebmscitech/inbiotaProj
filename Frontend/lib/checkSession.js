import { postAuth } from "../api";
import toastAlert from "@/utils/alert";

export const CheckSession = async (path) => {

    let data = {
        pageName: path,
    }

    await postAuth(data, '/check-session').then((res) => {
        console.log("ini post check-session", res)
    })
        .catch((err) => {
            console.log(err)
            if (err.code === "ERR_BAD_REQUEST") {
                toastAlert("error", err.response.data.message)
            }
            console.error(err)
        })
};
