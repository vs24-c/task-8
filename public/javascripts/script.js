

class RequireManager {

  static async handlerSubmit(route, id) {
    if (!route || !id) {
      throw new Error('Invalid request parameters');
    } 
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    if (!response.ok) {
      throw new Error(`Server Error ${response.statusText}`)
    }
    const data = await response.json()
    return data
  }
  
  static async deleteOwner(id) { 
    if (!id) {
      throw new Error('Invalid request parameters');
    }
    const response = await fetch(`/owners/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    window.location.reload(true)
    const data = await response.json()
    return data
  }
}

window.onload = () => {
  const edBrtn = document.querySelectorAll('.edit')
  edBrtn.forEach(btn => { 
    btn.addEventListener('click', async (e) => {
      const route = e.target.href
      const id = route.split('/').pop()
     await RequireManager.handlerSubmit(route, {id})
      
    })
  })

  const delBtn = document.querySelectorAll('.delete')    
  delBtn.forEach(btn => { 
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id       
    return await RequireManager.deleteOwner(id)      
    })
  })
}