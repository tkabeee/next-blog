export const filterByNotEmptySlug = {
  property: 'Slug',
  select: {
    is_not_empty: true,
  },
}

export const filterByPublishedPage = {
  property: 'Published',
  checkbox: {
    equals: true,
  },
}

export const filterBySlug = (slug: string) => {
  return {
    property: 'Slug',
    select: {
      equals: slug,
    },
  }
}

export const filterByCategory = (categoryCode: string) => {
  return {
    property: 'Category',
    select: {
      equals: categoryCode,
    },
  }
}

export const filterByTag = (tagName: string) => {
  return {
    property: 'Tag',
    multi_select: {
      contains: tagName,
    },
  }
}
