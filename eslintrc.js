// Übersicht zu den ESLint-Regeln: https://eslint.org/docs/rules/
module.exports = {
    env: {
   	 //Wo soll der Code später funktionieren?
   	 // https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments
   	 browser: true, // Läuft im Browser
   	 es2023: true, // Legt fest, welche Version von JS und damit welche Features erlaubt sind
   	 node: true, // Läuft mit Node
    },
    /* ESLint sucht in übergeordneten Verzeichnissen nach weiteren ESLint-Konfigurationen,
   	 um sie mit dieser Konfiguration zu verbinden. Das kann zwar nützlich sein, wenn man es
   	 bewusst nutzt, führt aber eher zu Problemen, weil ESLint sich anders verhält, als man
   	 möchte, ohne dass die Ursache klar ist. Mit root: true legt man fest, dass diese
   	 Konfiguration die oberste ist, es wird also nicht in Elternverzeichnissen gesucht.
   	 https://eslint.org/docs/latest/user-guide/configuring/configuration-files */
    root: true,
    parserOptions: {
   	 // https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options
   	 sourceType: 'module', // Werden JavaScript-Module genutzt, oder normale Scripte?
    },
    /* Liste der Regelsätze, die ESLint prüfen soll. Hier die empfohlenen Standard-Regeln
   	   und danach ein Regelsatz, der alle Regeln aufhebt, die mit Prettier in Konflikt
   	   stehen, so dass Prettier bei Formatierungsfragen das letze Wort hat.
   	   Wichtig: Prettier deshalb immer als letztes auflisten.
   	   https://eslint.org/docs/latest/user-guide/configuring/configuration-files#extending-configuration-files
   	   */
    extends: ['eslint:recommended', 'prettier'],
    /*
   	 Hier werden Regeln aktiviert bzw. deaktiviert. Diese Einstellung sind immer die
   	 letztgültigen, d.h. hier kann man Einstellungen aus Regelsätzen überschreiben.
   	 https://eslint.org/docs/latest/user-guide/configuring/rules
   	 */
    rules: {
   	 'no-var': 'error', // "off", "warn" oder "error", alternativ 0,1 oder 2
   	 'prefer-const': 'warn',
    },
};


