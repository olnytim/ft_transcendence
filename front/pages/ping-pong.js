import templateEngine from "../engine.js";
import {menu_template} from "../constants.js";
import { findKeyByValue } from "../utils.js";
import {showToast} from "../toast.js";

export const PingPongMain = () => {
    const language = localStorage.getItem('language') || 'en';
    const transObj = translations[language];
    const elements = [
        { name: transObj.singleplayer, href: '/ping-pong-single' },
        { name: transObj.multiplayer, href: '/ping-pong-multi' },
    ];

    const links = elements.map((el) => {
        return {
            tag: 'a',
            cls: ['btn', 'btn-primary'],
            attrs: {
                style: 'font-size: xx-large; text-transform: uppercase;',
                href: el.href,
                onclick: 'route(event)',
                'data-translate': findKeyByValue(translations[language], el.name),
            },
            content: el.name,
        };
    });
    const page = menu_template;

    page.content.content = links;
    const finPage = templateEngine(page);
    const mainPage = document.getElementById('main-page');
    mainPage.appendChild(finPage);
    showToast('')
};
