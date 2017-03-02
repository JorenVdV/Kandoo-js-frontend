import {Injectable} from "@angular/core";
import {Theme} from "../models/theme";

@Injectable()
export class ThemeServiceStub {
    themes: Theme[] = [
        {"_id": "1", "title": "test01", "description": "test", "tags": "test", "publicAccess": false},
        {"_id": "2", "title": "test02", "description": "test", "tags": "test", "publicAccess": false}
    ];

    createTheme(title: string, description: string, tags: string, publicAccess: boolean) {
        this.themes.push({"_id": "" + (this.themes.length + 1), "title": title, "description": description, "tags": tags, "publicAccess": publicAccess});
        return this.themes;
    }

    readTheme() {
        return this.themes.find(this.findTheme);
    }

    readThemes() {
        return this.themes;
    }

    findTheme(theme: Theme) {
        return theme._id === "2";
    }

    deleteTheme() {
        this.themes.splice(this.themes.findIndex(this.findTheme), 1);
        return this.themes;
    }
}
