// =============================================
// Complete Guide to React Lists and Keys
// =============================================

import React, { useState } from 'react';

// =============================================
// 1. Basic List Rendering
// =============================================

// Simple list component
const SimpleList = () => {
  const items = ['Apple', 'Banana', 'Orange'];
  
  return (
    <ul>
      {/* ❌ Bad: No keys */}
      {items.map(item => (
        <li>{item}</li>
      ))}
      
      {/* ✅ Good: With keys */}
      {items.map((item, index) => (
        <li key={index}>{item}</li> // Only use index for static lists
      ))}
    </ul>
  );
};

// =============================================
// 2. Lists with Unique IDs (Recommended Approach)
// =============================================

const ListWithIds = () => {
  const items = [
    { id: 'a1', text: 'First Item' },
    { id: 'a2', text: 'Second Item' },
    { id: 'a3', text: 'Third Item' }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

// =============================================
// 3. Dynamic Lists with State
// =============================================

const DynamicList = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' }
  ]);
  
  // Add new item
  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems([...items, { id: newId, text: `Item ${newId}` }]);
  };
  
  // Remove item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  // Update item
  const updateItem = (id, newText) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, text: newText } : item
    ));
  };
  
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => removeItem(item.id)}>Remove</button>
            <button onClick={() => updateItem(item.id, `Updated ${item.text}`)}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// =============================================
// 4. Nested Lists
// =============================================

const NestedList = () => {
  const data = [
    {
      id: 1,
      title: 'Category 1',
      items: [
        { id: 'sub1', text: 'Sub-item 1' },
        { id: 'sub2', text: 'Sub-item 2' }
      ]
    },
    {
      id: 2,
      title: 'Category 2',
      items: [
        { id: 'sub3', text: 'Sub-item 3' },
        { id: 'sub4', text: 'Sub-item 4' }
      ]
    }
  ];
  
  return (
    <ul>
      {data.map(category => (
        <li key={category.id}>
          {category.title}
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

// =============================================
// 5. Lists with Forms
// =============================================

const ListWithForms = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' }
  ]);
  
  const handleChange = (id, newValue) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, text: newValue } : item
    ));
  };
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <input
            value={item.text}
            onChange={(e) => handleChange(item.id, e.target.value)}
          />
        </li>
      ))}
    </ul>
  );
};

// =============================================
// 6. List with Sorting and Filtering
// =============================================

const SortableList = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Apple', category: 'fruit' },
    { id: 2, text: 'Banana', category: 'fruit' },
    { id: 3, text: 'Carrot', category: 'vegetable' }
  ]);
  
  // Filter items
  const filterByCategory = (category) => {
    return items.filter(item => item.category === category);
  };
  
  // Sort items
  const sortItems = () => {
    const sorted = [...items].sort((a, b) => a.text.localeCompare(b.text));
    setItems(sorted);
  };
  
  return (
    <div>
      <button onClick={sortItems}>Sort Alphabetically</button>
      
      <h3>All Items</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      
      <h3>Fruits Only</h3>
      <ul>
        {filterByCategory('fruit').map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

// =============================================
// 7. Common Anti-patterns and Solutions
// =============================================

// ❌ Bad: Using non-unique or unstable keys
const BadKeyExample = () => {
  const items = [
    { text: 'Item 1', category: 'A' },
    { text: 'Item 2', category: 'A' } // Duplicate category!
  ];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.category}>{item.text}</li> // Bad: non-unique key
      ))}
    </ul>
  );
};

// ✅ Good: Using unique, stable keys
const GoodKeyExample = () => {
  const items = [
    { id: 'unique1', text: 'Item 1', category: 'A' },
    { id: 'unique2', text: 'Item 2', category: 'A' }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li> // Good: unique key
      ))}
    </ul>
  );
};

// =============================================
// 8. Performance Optimized List
// =============================================

const OptimizedList = React.memo(({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

const ListItem = React.memo(({ item }) => {
  return <li>{item.text}</li>;
});

// =============================================
// 9. List with Drag and Drop
// =============================================

const DraggableList = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Draggable 1' },
    { id: 2, text: 'Draggable 2' },
    { id: 3, text: 'Draggable 3' }
  ]);
  
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };
  
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    const newItems = [...items];
    const draggedIndex = items.findIndex(item => item.id === draggedId);
    const targetIndex = items.findIndex(item => item.id === targetId);
    
    // Swap items
    [newItems[draggedIndex], newItems[targetIndex]] = 
    [newItems[targetIndex], newItems[draggedIndex]];
    
    setItems(newItems);
  };
  
  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, item.id)}
          style={{ cursor: 'move' }}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

// =============================================
// Best Practices Summary
// =============================================

/*
1. Always use unique keys for list items
2. Avoid using index as key for dynamic lists
3. Keys should be:
   - Stable (not change over time)
   - Unique among siblings
   - Consistent across re-renders
4. Use IDs from your data when available
5. Keep key generation logic consistent
6. Don't generate keys on the fly during render
7. Keys are only needed among siblings
8. Keys should be strings or numbers

Common Mistakes to Avoid:
- Using non-unique keys
- Using random numbers as keys
- Using index for dynamic lists
- Not providing keys at all
- Using keys that change on every render

Performance Tips:
- Use React.memo for list items if needed
- Keep key generation outside render method
- Avoid inline key generation
- Use stable references for handler functions
*/

// Export all components
export {
  SimpleList,
  ListWithIds,
  DynamicList,
  NestedList,
  ListWithForms,
  SortableList,
  BadKeyExample,
  GoodKeyExample,
  OptimizedList,
  DraggableList
};