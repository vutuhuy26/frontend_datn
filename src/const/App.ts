export class App {
    static readonly HOST = 'localhost';
    static readonly PORT_MAIN = 3009;
    static readonly PORT_EVENT = 3008;
    static readonly URL_MAIN = `http://${App.HOST}:${App.PORT_MAIN}/`;
    static readonly URL_EVENT = `http://${App.HOST}:${App.PORT_EVENT}`;
    static readonly DELAY_SEARCH = 750;
}
