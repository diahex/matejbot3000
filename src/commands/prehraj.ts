import { Message } from "discord.js";
import glob from "glob"
import fs from "fs"

module.exports = {
    name: 'přehraj',
    description: 'Příjde k tobě do voice channelu a zahraje co chceš (seznam souborů lze vypsat pomocí **vypiš**)',
    execute(msg: Message, args: string[])
    {
        var channel = msg.member?.voice.channel;
        if (channel)
        {
            let filename = args.join(' ');
            if (!filename)
            {
                msg.channel.send("A co mám přehrát vole? Dej mi pokoj.");
                return;
            }
            let files = glob.sync(`sounds/**/${filename}.mp3`);
            if (files.length == 0)
            {
                msg.channel.send(filename + "? To se mi nezdá, to bude nějaká pyčovina.");
                return;
            }
            channel.join()
                .then(connection =>
                {
                    connection.play(files[0]);
                })
                .catch(console.error);



        }

    },
};