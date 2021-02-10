{
    "build": {
        "target": ".",
        "tasks": [
            {
                "for": "node-cf",
                "src": "srv",
                "options": {
                    "model": [
                        "srv"
                    ]
                }
            }
        ]
    },
    "odata": {
        "version": "v4"
    },
    "requires": {
        "db": {
            "kind": "sqlite",
            "model": [
                "srv",
                "db"
            ],
            "credentials": {
                "database": "{{ projectName }}.db"
            }
        }
    }
}
