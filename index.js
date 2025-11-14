import settings from "ep_etherpad-lite/node/utils/Settings";

const config = settings.ep_bark_notifications

exports.userJoin = (hookName, { authorId, displayName, padId }) => {
    console.log(`${authorId} ${displayName} joined pad ${padId}`)
    if (config.padIdArray.includes(padId)) {
        notify({ title: padId, body: `${authorId} joined pad ${padId}` })
    }
};


exports.userLeave = async (hookName, { author, padId }) => {
    console.log(`${author} left pad ${padId}`);
    if (config.padIdArray.includes(padId)) {
        notify({ title: padId, body: `${author} left pad ${padId}` })
    }
};

async function notify(froms) {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "okhttp/3.14.9");
    myHeaders.append("Content-Type", "application/json; charset=utf-8");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Host", "api.day.app");
    myHeaders.append("Connection", "keep-alive");

    var raw = `{
        \"device_key\":\"${config.device_key}\",\"title\":\"${froms.title}\",\"body\":\"${froms.body}\",\"sound\":\"${config.sound}\",\"action\":\"none\"}`;

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("https://api.day.app/push", requestOptions)
    console.log(await response.json());

}