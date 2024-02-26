import axios from "~/lib/axios";

// TODO: Support typing for multiple types query
type params = {
  query: string;
  type?:
    | videogame
    | boardgame
    | "rpgitem"
    | "boardgameaccessory"
    | "boardgameexpansion";
  exact?: true;
};

type response = {
  _attributes: { type: string; id: string };
  name: { _attributes: { type: string; value: string } };
  yearpublished?: { _attributes: { value: string } };
};

type item = {
  id: string;
  type: string;
  name: string;
  yearPublished?: string;
};

const transformData = (data: response): item => {
  return {
    id: data._attributes.id,
    type: data._attributes.type,
    name: data.name._attributes.value,
    yearPublished: data.yearpublished?._attributes.value,
  };
};

export const search = async (params: params): Promise<item[] | item | null> => {
  const { data } = await axios.get("/search", { params });

  if (params.exact) {
    if (!data.items.item) return null;
    return transformData(data.items.item);
  }

  if (!data.items.item) return [];

  return data.items.item.map((data: response) => {
    return transformData(data);
  });
};
