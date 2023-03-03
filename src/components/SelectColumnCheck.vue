<template>
  <div>
    <b-row>
      <b-col sm="12">
        <div class="quick-filter-wrapper">
          <div class="quick-filter-left">
            <b-dropdown split split-variant="outline-secondary" size="sm" id="dropdown-form" :text="$t('globalTrans.column_visibility')" ref="dropdown">
              <b-dropdown-form>
                <div
                  class="form-group"
                  v-for="(field, index) in labelData"
                  :key="index"
                  >
                    <b-form-checkbox
                      :id="'checkbox-' + field.order"
                      v-model="field.show"
                      :name="'checkbox-' + field.order"
                      value=1
                      unchecked-value=0
                    >
                      {{ field.label }}
                    </b-form-checkbox>
                </div>
              </b-dropdown-form>
            </b-dropdown>
          </div>
          <div class="quick-filter-right">
            <b-form-group
              :label="$t('menu.perpage')"
              label-for="per-page-select"
            >
              <b-form-select
                id="per-page-select"
                v-model="search.limit"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: ['labelData', 'columns', 'search'],
  data () {
    return {
      sortBy: '',
      sortDesc: true,
      sortDirection: 'desc',
      editItemId: 0
    }
  },
  computed: {
    pageOptions () {
      return this.$store.state.commonObj.pageOptions
    }
  },
  methods: {
  }
}
</script>
