import { WebSearch } from "../web-search";
import { WebSearchHelpers } from "../helpers/web-search-helper";
import { SearchResultItem } from "../search-result-item";

export class WebSearchBuilder {
    public static buildSearchTerm(userInput: string, webSearch: WebSearch): string {
        return userInput.replace(`${webSearch.prefix}${WebSearchHelpers.webSearchSeparator}`, "");
    }

    public static buildExecutionUrl(userInput: string, webSearch: WebSearch): string {
        const searchTerm = this.buildSearchTerm(userInput, webSearch);
        return `${webSearch.url}${searchTerm.trim()}`;
    }

    public static buildSearchResultItem(userInput: string, webSearch: WebSearch): SearchResultItem {
        const searchTerm = WebSearchBuilder.buildSearchTerm(userInput, webSearch);

        const searchResultItemName = searchTerm.length > 0
            ? `Search ${webSearch.name} for '${searchTerm.trim()}'`
            : `Search ${webSearch.name}`;

        const executionArgument = WebSearchBuilder.buildExecutionUrl(userInput, webSearch);

        return {
            description: executionArgument,
            executionArgument,
            icon: webSearch.icon,
            name: searchResultItemName,
            searchable: [],
            tags: [],
        } as SearchResultItem;
    }
}
