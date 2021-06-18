using app.interactions from '../db/interactions';
service CatalogService {

entity Interactions_Header
	as projection on interactions.Interactions_Header;

entity Interactions_Items
	as projection on  interactions.Interactions_Items;

function InsertHeader(partner :String) returns String;
function UpdateHeader(id :String, logdate :String, cc :String) returns String;
function DeleteHeader(id :String) returns String;
}