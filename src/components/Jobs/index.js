import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {IoStar} from 'react-icons/io5'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const apiConstants1 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class Jobs extends Component {
  state = {
    profile: {},
    searchItems: [],
    empList: [],
    minPkg: '',
    searchStr: '',
    status: apiConstants.initial,
    status1: apiConstants1.initial,
  }

  componentDidMount() {
    this.getData()
  }

  clickCheck = event => {
    const {empList} = this.state
    const checkedVal = event.target.value
    const valIncluded = empList.includes(checkedVal)
    if (!valIncluded) {
      empList.push(checkedVal)
      this.setState({empList}, this.getSearchItemsData)
    } else {
      const filteredList = empList.filter(each => each !== checkedVal)
      this.setState({empList: filteredList}, this.getSearchItemsData)
    }
  }

  clickRadio = event => {
    this.setState({minPkg: event.target.value}, this.getSearchItemsData)
  }

  changeSearch = event => {
    this.setState({searchStr: event.target.value})
  }

  searchBtnClick = () => {
    const {searchStr} = this.state
    // console.log(event.target.value)
    this.setState({searchStr}, this.getSearchItemsData)
  }

  getProfileData = async () => {
    this.setState({status1: apiConstants1.loading})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const profileResponse = await fetch(profileApiUrl, options)
    if (profileResponse.ok) {
      const profileData = await profileResponse.json()
      const {...details} = profileData
      const updatedProfileData = {
        name: details.profile_details.name,
        profileImgUrl: details.profile_details.profile_image_url,
        shortBio: details.profile_details.short_bio,
      }
      this.setState({
        profile: updatedProfileData,
        status1: apiConstants1.success,
      })
    } else {
      this.setState({status1: apiConstants1.failure})
    }
  }

  getSearchItemsData = async () => {
    this.setState({status: apiConstants.loading})
    const {empList, minPkg, searchStr} = this.state
    const joinedStr = empList.join(',')
    console.log(joinedStr)

    const searchItemsUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedStr}&minimum_package=${minPkg}&search=${searchStr}`
    console.log(searchItemsUrl)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const searchItemsResponse = await fetch(searchItemsUrl, options)

    if (searchItemsResponse.ok) {
      const searchItemsData = await searchItemsResponse.json()
      const updatedSearchItemsData = searchItemsData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        pkgPerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      // console.log(profileData)
      //   console.log(updatedSearchItemsData === 0, updatedSearchItemsData)

      this.setState({
        searchItems: updatedSearchItemsData,
        status: apiConstants.success,
      })
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  getData = async () => {
    this.getSearchItemsData()
    this.getProfileData()
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  loadingProfileView = () => (
    <div className="profile-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-view-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="failure-view-img"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.getSearchItemsData}
        className="failure-view-btn"
      >
        Retry
      </button>
    </div>
  )

  listOfItems = searchItems => (
    <ul className="search-con-ul-con">
      {searchItems.map(each => {
        const {
          title,
          jobDescription,
          pkgPerAnnum,
          rating,
          location,
          id,
          employmentType,
          companyLogoUrl,
        } = each
        return (
          <li className="search-item-li-con" key={each.id}>
            <Link className="jobs-links" to={`/jobs/${id}`}>
              <div className="search-item-logo-con">
                <img
                  src={companyLogoUrl}
                  alt="company logo"
                  className="search-item-comp-logo"
                />
                <div className="search-item-title-star-con">
                  <h1 className="search-item-title">{title}</h1>
                  <div className="search-item-star-rating-con">
                    <IoStar className="search-item-star-img" />
                    <p className="search-item-rating">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="search-item-location-pkg-con">
                <div className="search-item-location-work-con">
                  <div className="search-item-location-con">
                    <MdLocationOn className="search-item-location-icon" />
                    <p className="search-item-location">{location}</p>
                  </div>
                  <div className="search-item-emp-type-con">
                    <MdWork className="search-item-emp-type-icon" />
                    <p className="search-item-emp-type">{employmentType}</p>
                  </div>
                </div>
                <p className="search-item-pkg-per-annum">{pkgPerAnnum}</p>
              </div>
              <hr className="hr-line" />
              <h1 className="search-item-desc-heading">Description</h1>
              <p className="search-item-description">{jobDescription}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  noItemFound = () => (
    <div className="no-item-found-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-item-found-img"
      />
      <h1 className="no-item-found-heading">No Jobs Found</h1>
      <p className="no-item-found-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  searchCon = () => {
    const {searchItems, searchStr} = this.state
    // console.log(searchItems.length)
    const showComponent =
      searchItems.length === 0
        ? this.noItemFound()
        : this.listOfItems(searchItems)
    return (
      <div className="search-con">
        <div className="search-btn-input-con">
          <input
            type="search"
            className="search-input"
            onChange={this.changeSearch}
            placeholder="Search"
            value={searchStr}
          />

          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.searchBtnClick}
          >
            <BsSearch className="search-icon" alt="search icon" />
          </button>
        </div>
        {showComponent}
      </div>
    )
  }

  profileSuccessView = () => {
    const {profile} = this.state
    const {name, shortBio, profileImgUrl} = profile
    return (
      <div className="profile-con">
        <img src={profileImgUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">Venkateswara Rao Boddapati</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  profileFailureView = () => (
    <div className="profile-failure-con">
      <button
        type="button"
        onClick={this.getProfileData}
        className="failure-view-btn"
      >
        Retry
      </button>
    </div>
  )

  getProfileDataViews = () => {
    const {status1} = this.state
    switch (status1) {
      case apiConstants1.success:
        return this.profileSuccessView()
      case apiConstants1.failure:
        return this.profileFailureView()
      case apiConstants1.loading:
        return this.loadingProfileView()
      default:
        return null
    }
  }

  getSearchItemViews = () => {
    const {status} = this.state
    switch (status) {
      case apiConstants.success:
        return this.searchCon()
      case apiConstants.failure:
        return this.failureView()
      case apiConstants.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {searchStr} = this.state
    return (
      <div>
        <Header />

        <div className="profile-search-con">
          <div className="search-btn-input-con1">
            <input
              type="search"
              className="search-input"
              onChange={this.changeSearch}
              placeholder="Search"
              value={searchStr}
            />

            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.searchBtnClick}
            >
              <BsSearch className="search-icon" alt="search icon" />
            </button>
          </div>
          <div className="profile-emp-types-sal-con">
            {this.getProfileDataViews()}
            <hr className="hr-line" />

            <h1 className="emp-types-heading">Type of Employment</h1>
            <ul className="emp-type-ul-con">
              {employmentTypesList.map(each => (
                <li className="emp-type-li-item" key={each.employmentTypeId}>
                  <input
                    value={each.employmentTypeId}
                    id={each.employmentTypeId}
                    type="checkbox"
                    onClick={this.clickCheck}
                  />
                  <label htmlFor={each.employmentTypeId} className="emp-label">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="hr-line" />
            <h1 className="emp-types-heading">Salary Range</h1>
            <ul className="sal-range-ul-con">
              {salaryRangesList.map(each => (
                <li className="sal-range-li-item" key={each.salaryRangeId}>
                  <input
                    onClick={this.clickRadio}
                    id={each.salaryRangeId}
                    type="radio"
                    name="radios"
                    value={each.salaryRangeId}
                  />
                  <label htmlFor={each.salaryRangeId} className="sal-label">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {this.getSearchItemViews()}
        </div>
      </div>
    )
  }
}

export default Jobs
