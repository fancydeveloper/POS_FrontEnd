import React, { useState, useEffect } from 'react';
import Table from '../../EntryFile/datatable';
import { Link } from 'react-router-dom';
import Tabletop from '../../EntryFile/tabletop';
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  PlusIcon,
  Printer,
  Search,
  MacbookIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import Swal from 'sweetalert2';
import api from '../../utils/api';

const options = [
  { id: 1, text: 'Choose Category', text: 'Choose Category' },
  { id: 2, text: 'Computers', text: 'Computers' },
];
const options1 = [
  { id: 1, text: 'Choose Sub Category', text: 'Choose Sub Category' },
  { id: 2, text: 'Fruits', text: 'Fruits' },
];
const options2 = [
  { id: 1, text: 'Choose Sub Brand', text: 'Choose Sub Brand' },
  { id: 2, text: 'Brand', text: 'Brand' },
];
const confirmText = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: !0,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ml-1',
    buttonsStyling: !1,
  }).then(function (t) {
    t.value &&
      Swal.fire({
        type: 'success',
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        confirmButtonClass: 'btn btn-success',
      });
  });
};
const CategoryList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  useEffect(() => {
    // console.log(data);
    const fetchData = async () => {
      await api.get('/category/all').then((res) => {
        console.log('category list ----->>  ', res.data);
        res.data.map((category) => {
          category.createdAt = new Date(category.createdAt).toDateString();
        });
        setCategoryList(res.data);
      });
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
    },
    {
      title: 'Created By',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: 'Action',
      render: () => (
        <>
          <>
            <Link className="me-3" to="/dream-pos/product/editcategory-product">
              <img src={EditIcon} alt="img" />
            </Link>
            <Link className="confirm-text" to="#" onClick={confirmText}>
              <img src={DeleteIcon} alt="img" />
            </Link>
          </>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Category List </h4>
              <h6>View/Search product Category</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/dream-pos/product/addcategory-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add Category
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? 'toggleCls' : ''}`}
                id="filter_inputs"
                style={{ display: inputfilter ? 'block' : 'none' }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: 'Choose Category',
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12 me-2">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options1}
                          options={{
                            placeholder: 'Choose Sub Category',
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options2}
                          options={{
                            placeholder: 'Choose Sub Brand',
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                      <div className="form-group">
                        <a className="btn btn-filters ms-auto">
                          <img src={search_whites} alt="img" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={categoryList} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default CategoryList;
