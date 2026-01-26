import { useMemo, useState } from 'react'
import { useDataContext } from '../providers/DataProvider'
import { NavLink } from 'react-router-dom'
import CategoryFilter from './CategoryFilter'
import TemplatesSkeleton from './TemplatesSkeleton'
import { useAuthContext } from '../providers/AuthContextProvider'

export default function Templates() {
  const { templates, gridsLoading } = useDataContext()
  const [filterOption, setFilterOption] = useState('All Categories')
  const { userDataLoading } = useAuthContext()

  // Memoize the filtering and categorization
  const templatesByCategory = useMemo(() => {
    // Group templates by category
    const grouped = {}
    templates.forEach((template) => {
      if (!grouped[template.templateCategory]) {
        grouped[template.templateCategory] = []
      }
      grouped[template.templateCategory].push(template)
    })

    return grouped
  }, [templates]) // Only recalculate when grids change

  const templateCategories = [
    'All Categories',
    'Career Growth',
    'Health & Fitness',
    'Learning & Education',
    'Financial Goals',
    'Home & Lifestyle',
  ]

  return !gridsLoading && !userDataLoading ? (
    <section className="flex flex-col gap-5 mt-5 basis-4/5 relative">
      <h1 className="text-2xl font-bold">Templates</h1>
      <p>
        Explore these templates to get some inspiration – or simply use them as
        is and change them to fit your needs.
      </p>
      <div className="absolute right-0 top-0">
        <CategoryFilter
          categories={templateCategories}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
        />
      </div>
      {templateCategories
        .filter((category) =>
          filterOption !== 'All Categories'
            ? category === filterOption
            : category
        )
        .map((category) => {
          const categoryTemplates = templatesByCategory[category] || []

          if (categoryTemplates.length === 0) return null

          return (
            <div key={category.split(' ').join('-')}>
              <h2 className="font-bold mb-4 text-xl">{category}</h2>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {categoryTemplates.map((template) => (
                  <div
                    key={template._id}
                    className="card shadow-sm border border-primary/60 hover:bg-secondary/60 hover:border-accent ease-in-out duration-100"
                  >
                    <figure className="px-10 pt-10">
                      <img
                        src={template.image.replace(
                          '/upload/',
                          '/upload/w_400,f_auto,q_auto/'
                        )}
                        alt={template.title}
                        className="rounded-xl"
                        loading="lazy"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{template.title}</h2>
                      <p>{template.description}</p>
                      <div className="card-actions">
                        <NavLink to={`/dashboard/templates/${template._id}`}>
                          <button className="btn btn-primary">
                            View Template
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
    </section>
  ) : (
    <TemplatesSkeleton />
  )
}
