import { Load } from '@ismithi/react-utils';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ICategory } from 'interfaces';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IEntityStore } from 'stores/entityStore';

interface IProps {
  categoriesStore?: IEntityStore<ICategory>;
  value: any;
  onChange: (id: string) => void;
}

export const CategoriesSelect = inject('categoriesStore')(
  observer(({ categoriesStore, onChange, value }: IProps) => {
    const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value);

    return (
      <Load instantly={true} on={categoriesStore.load}>
        {({ loaded }) => (
          <>
            {loaded && (
              <FormControl fullWidth={true}>
                <InputLabel htmlFor='category'>Choose category</InputLabel>
                <Select
                  style={{ minWidth: 100 }}
                  value={value || ''}
                  onChange={handleValueChange}
                  inputProps={{ name: 'name', id: 'category' }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {categoriesStore.entitiesData.map(c => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}
      </Load>
    );
  })
);
