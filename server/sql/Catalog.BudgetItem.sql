
CREATE OR ALTER   VIEW [dbo].[Catalog.BudgetItem]
AS

    SELECT
        d.id, d.type, d.date, d.code, d.description "BudgetItem", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([parent2.v].description, '') [parent2.value], d.[parent2] [parent2.id], [parent2.v].type [parent2.type]
		, d.[kind] [kind]
        , d.[UnaryOperator] [UnaryOperator]
        , d.[DescriptionENG] [DescriptionENG]
      
        , ISNULL(l5.id, d.id) [BudgetItem.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [BudgetItem.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [BudgetItem.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [BudgetItem.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [BudgetItem.Level1.id]
        , ISNULL(l5.description, d.description) [BudgetItem.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [BudgetItem.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [BudgetItem.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [BudgetItem.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [BudgetItem.Level1]
        --- PARENT 2 BEGIN ---
		, ISNULL(ll5.id, d.id) [BudgetItem2.Level5.id]
        , ISNULL(ll4.id, ISNULL(ll5.id, d.id)) [BudgetItem2.Level4.id]
        , ISNULL(ll3.id, ISNULL(ll4.id, ISNULL(ll5.id, d.id))) [BudgetItem2.Level3.id]
        , ISNULL(ll2.id, ISNULL(ll3.id, ISNULL(ll4.id, ISNULL(ll5.id, d.id)))) [BudgetItem2.Level2.id]
        , ISNULL(ll1.id, ISNULL(ll2.id, ISNULL(ll3.id, ISNULL(ll4.id, ISNULL(ll5.id, d.id))))) [BudgetItem2.Level1.id]
        , ISNULL(ll5.description, d.description) [BudgetItem2.Level5]
        , ISNULL(ll4.description, ISNULL(ll5.description, d.description)) [BudgetItem2.Level4]
        , ISNULL(ll3.description, ISNULL(ll4.description, ISNULL(ll5.description, d.description))) [BudgetItem2.Level3]
        , ISNULL(ll2.description, ISNULL(ll3.description, ISNULL(ll4.description, ISNULL(ll5.description, d.description)))) [BudgetItem2.Level2]
        , ISNULL(ll1.description, ISNULL(ll2.description, ISNULL(ll3.description, ISNULL(ll4.description, ISNULL(ll5.description, d.description))))) [BudgetItem2.Level1]
    --- PARENT 2 END --
    FROM [Catalog.BudgetItem.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.BudgetItem.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.BudgetItem.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.BudgetItem.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.BudgetItem.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.BudgetItem.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
        --- PARENT 2 BEGIN ---
        LEFT JOIN [Catalog.BudgetItem.v] ll5 WITH (NOEXPAND) ON (ll5.id = d.parent2)
        LEFT JOIN [Catalog.BudgetItem.v] ll4 WITH (NOEXPAND) ON (ll4.id = ll5.parent2)
        LEFT JOIN [Catalog.BudgetItem.v] ll3 WITH (NOEXPAND) ON (ll3.id = ll4.parent2)
        LEFT JOIN [Catalog.BudgetItem.v] ll2 WITH (NOEXPAND) ON (ll2.id = ll3.parent2)
        LEFT JOIN [Catalog.BudgetItem.v] ll1 WITH (NOEXPAND) ON (ll1.id = ll2.parent2)

        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]

        LEFT JOIN dbo.[Documents] [parent2] ON [parent2].id = d.[parent2]
        --- PARENT 2 END ---
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.BudgetItem.v] [parent2.v] WITH (NOEXPAND) ON [parent2.v].id = d.[parent2]
    ;
GO
GRANT SELECT ON dbo.[Catalog.BudgetItem] TO jetti;
GO