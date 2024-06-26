import React from 'react'

export default function UserdataTable({ data, theadData }) {
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto'>
        <div className=' w-full inline-block align-middle'>
          <div className=' '>
            <table className='min-w-full divide-y divide-gray-200 border border-t-0 rounded-b-lg'>
              <thead className=''>
                <tr>
                  {Object.keys(theadData[0]).map(val => (
                    <th
                      key={val.id}
                      scope='col'
                      className='bg-slate-800 px-6 py-3 text-xs font-bold text-left text-gray-600 uppercase '
                    >
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 overflow-x-auto'>
                {data?.map(item => {
                  return (
                    <tr key={item.id}>
                      <td className='px-6 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>{item.id}</td>
                      <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.name}</td>
                      {item.level && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.level}</td>
                      )}
                      {item.workout && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.workout}</td>
                      )}
                      {item.phone && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.phone}</td>
                      )}
                      {item.email && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.email}</td>
                      )}
                      {item.catagory_diet && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.catagory_diet}</td>
                      )}
                      {item.calories && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.calories}</td>
                      )}
                      {item.carbs && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.carbs}</td>
                      )}
                      {item.protein && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.protein}</td>
                      )}
                      {item.fat && <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.fat}</td>}
                      {item.servings && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.servings}</td>
                      )}
                      {item.time && <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.time}</td>}
                      {item.featured && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.featured}</td>
                      )}

                      {item.age && <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.age}</td>}
                      {item.status && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.status}</td>
                      )}

                      <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.dete}</td>

                      {item.updatedete && (
                        <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.updatedete}</td>
                      )}
                      <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                        <a className='text-red-500 hover:text-red-700' href='#'>
                          Action
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
