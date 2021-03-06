import { SearchPlugin } from "./search-plugin";
import { SearchResultItem } from "../search-result-item";
import { IconSet } from "../icon-sets/icon-set";

export class EnvironmentVariablePlugin implements SearchPlugin {
    private variableCollection: { [key: string]: string };
    private iconSet: IconSet;

    constructor(variableCollection: { [key: string]: string }, iconSet: IconSet) {
        this.variableCollection = variableCollection;
        this.iconSet = iconSet;
    }

    public getAllItems(): SearchResultItem[] {
        const result: SearchResultItem[] = [];

        for (const variableName of Object.keys(this.variableCollection)) {
            result.push({
                description: this.variableCollection[variableName],
                executionArgument: this.variableCollection[variableName],
                icon: this.iconSet.environmentVariableIcon,
                name: variableName,
                searchable: [variableName],
            });
        }

        return result;
    }
}
