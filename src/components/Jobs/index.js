import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
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

class Jobs extends Component {
  state = {profile: {}, searchItems: [], empList: [], minPkg: '', searchStr: ''}

  componentDidMount() {
    this.getData()
  }

  clickCheck = event => {
    const {empList} = this.state
    const val = event.target.checked
    if (val) {
      empList.push(event.target.value)
      this.setState({empList}, this.getData)
    } else {
      const checkedVal = event.target.value
      const indexedVal = empList.indexOf(checkedVal)
      const filteredList = empList.filter(
        each => empList.indexOf(each) !== indexedVal,
      )
      this.setState({empList: filteredList}, this.getData)
    }
  }

  clickRadio = event => {
    this.setState({minPkg: event.target.value}, this.getData)
  }

  changeSearch = event => {
    console.log(event.key)
    if (event.key === 'Enter') {
      this.setState({searchStr: event.target.value}, this.getData)
    }
  }

  getData = async () => {
    const {empList, minPkg, searchStr} = this.state
    const joinedStr = empList.join(',')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const searchItemsUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedStr}&minimum_package=${minPkg}&search=${searchStr}`
    console.log(searchItemsUrl)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const profileResponse = await fetch(profileApiUrl, options)
    const searchItemsResponse = await fetch(searchItemsUrl, options)
    const profileData = await profileResponse.json()
    const searchItemsData = await searchItemsResponse.json()
    const {...details} = profileData

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
    const updatedProfileData = {
      name: details.profile_details.name,
      profileImgUrl: details.profile_details.profile_image_url,
      shortBio: details.profile_details.short_bio,
    }
    // console.log(profileData)
    // console.log(updatedSearchItemsData)
    this.setState({
      profile: updatedProfileData,
      searchItems: updatedSearchItemsData,
    })
  }

  searchCon = () => {
    const {searchItems} = this.state
    return (
      <div className="search-con">
        <div className="search-btn-input-con">
          <input
            type="search"
            className="search-input"
            onKeyDown={this.changeSearch}
            placeholder="Search"
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
          >
            <BsSearch className="search-icon" alt="search icon" />
          </button>
        </div>
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
                        <span className="search-item-rating">{rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="search-item-location-pkg-con">
                    <div className="search-item-location-work-con">
                      <div className="search-item-location-con">
                        <MdLocationOn className="search-item-location-icon" />
                        <span className="search-item-location">{location}</span>
                      </div>
                      <div className="search-item-emp-type-con">
                        <MdWork className="search-item-emp-type-icon" />
                        <span className="search-item-emp-type">
                          {employmentType}
                        </span>
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
      </div>
    )
  }

  render() {
    const {profile} = this.state
    const {name, shortBio, profileImgUrl} = profile
    return (
      <div>
        <Header />
        <div className="profile-search-con">
          <div className="profile-emp-types-sal-con">
            <div className="profile-con">
              <img src={profileImgUrl} alt="profile" className="profile-img" />
              <h1 className="profile-name">{name}</h1>
              <p className="profile-bio">{shortBio}</p>
            </div>
            <hr className="hr-line" />

            <h1 className="emp-types-heading">Types of Employment</h1>
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

          {this.searchCon()}
        </div>
      </div>
    )
  }
}

export default Jobs
