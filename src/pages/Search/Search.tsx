import React from "react";
import CheepList, { CheepListType } from "../../components/CheepList";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../Sparrow/components/SearchBar";

export type Props = {
    params?: URLSearchParams;
}

const Search: React.FunctionComponent<Props> = (props) =>
{
    return <div className="home-page">
        <PageHeader>
            <SearchBar id="search-search-bar" defaultValue={props.params ? props.params.get("q") || undefined : undefined} />
        </PageHeader>

        <CheepList
            name="search"
            type={CheepListType.Search}
            arguments={
            {
                words: props.params ? props.params.get("q") || "" : ""
            }}
        />
    </div>;
};

export default Search;