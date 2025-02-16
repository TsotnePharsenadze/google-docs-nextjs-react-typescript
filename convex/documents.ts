import { ConvexError, convexToJson, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized Action");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  },
});

export const listDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized actions");
    const organization_id = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (args.title && organization_id) {
      return ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q
            .search("title", args.title as string)
            .eq("organizationId", organization_id)
        )
        .paginate(args.paginationOpts);
    }

    if (args.title) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.title as string).eq("ownerId", user.subject)
        )
        .paginate(args.paginationOpts);
    }

    if (organization_id) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organization_id)
        )
        .paginate(args.paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(args.paginationOpts);
  },
});

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized Action");

    const document = await ctx.db.get(args.documentId);

    if (!document) throw new ConvexError("Document doesn't exists");

    const isOwner = user?.subject === document.ownerId;

    if (!isOwner) throw new ConvexError("Unauthorized Action");

    return await ctx.db.delete(args.documentId);
  },
});

export const updateDocument = mutation({
  args: {
    documentId: v.id("documents"),
    documentTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized Action");

    const document = await ctx.db.get(args.documentId);

    if (!document) throw new ConvexError("Document doesn't exists");

    const isOwner = user?.subject === document.ownerId;

    if (!isOwner) throw new ConvexError("Unauthorized Action");

    return await ctx.db.patch(args.documentId, {
      title: args.documentTitle,
    });
  },
});
