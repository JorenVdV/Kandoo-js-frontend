import {Injectable} from "@angular/core";
import {Theme} from "../models/theme";

@Injectable()
export class ThemeServiceStub {
    themes: Theme[]/* = [
        {
            "name": "test01",
            "description": "test",
            "tags": "test",
            "publicAccess": false,
            "cards": [{
                "description": "heh?",
                "priority": 1,
                "_id": 1
            }],
            "_id": 14
        },
        {
            "name": "test02",
            "description": "test",
            "tags": "test",
            "publicAccess": false,
            "cards": [{
                "description": "heh?",
                "priority": 1,
                "_id": 1
            }],
            "_id": 15
        },
        {
            "name": "test03",
            "description": "djsmfqjm",
            "tags": "mjm",
            "publicAccess": false,
            "cards": [{
                "description": "heh?",
                "priority": 1,
                "_id": 1
            }],
            "_id": 17
        }
    ]*/;

    createTheme(name: string, description: string, tags: string, publicAccess: boolean) {
        return JSON.stringify({name: name, description: description, tags: tags, publicAccess: publicAccess})
    }

    readTheme() {
        return this.themes.find(this.findTheme);
    }

    readThemes() {
        return this.themes;
    }

    findTheme(theme: Theme) {
        return theme._id === "15";
    }

    deleteTheme() {
        this.themes.splice(this.themes.findIndex(this.findTheme), 1);
        return this.themes;
    }
}
