import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import {
  searchByQuery,
  searchByQueryInField,
  sortByFieldname,
} from 'src/services/helpers';
import { Application } from 'src/customDatatypes';

@Injectable()
export class ApplicationsService {
  private applications: Application[] = [
    {
      id: 1,
      applicationUID: 'we47-qw52',
      date: '1713724061348',
      companyName: 'Yeti & CO. D',
      driverName: 'Олег',
      driverPhone: '89199004556',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      status: 1,
      ATI: '12345',
    },
    {
      id: 2,
      applicationUID: 'we47-qw51',
      date: '1713724061348',
      companyName: 'Yeti & CO. B',
      driverName: 'Владимир',
      driverPhone: '89199004556',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      status: 1,
      ATI: '12345',
    },
    {
      id: 3,
      applicationUID: 'we47-qw50',
      date: '1713724061348',
      companyName: 'Yeti & CO. E',
      driverName: 'Алексей',
      driverPhone: '89199004556',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      status: 1,
      ATI: '12345',
    },
    {
      id: 4,
      applicationUID: 'we47-qw57',
      date: '1713724061348',
      companyName: 'Yeti & CO. A',
      driverName: 'Сергей',
      driverPhone: '89199004556',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      status: 1,
      ATI: '12345',
    },
    {
      id: 5,
      applicationUID: 'we47-qw59',
      date: '1613724061348',
      companyName: 'Yeti & CO. C',
      driverName: 'Алексей',
      driverPhone: '89199004556',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      status: 2,
      ATI: '12345',
    },
    {
      id: 6,
      applicationUID: 'we47-qw60',
      date: '1613724061348',
      companyName: 'Yeti & CO. C',
      driverName: 'Алексей',
      driverPhone: '89199004556',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      status: 2,
      ATI: '12345',
    },
    {
      id: 7,
      applicationUID: 'we47-qw61',
      date: '1613724061348',
      companyName: 'Yeti & CO. C',
      driverName: 'Алексей',
      driverPhone: '89199004556',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      status: 2,
      ATI: '12345',
    },
  ];

  findAll(status?: 1 | 2 | 3) {
    if (status) {
      const statusesArray = this.applications.filter(
        (application) => application.status === status,
      );
      if (statusesArray.length === 0)
        throw new NotFoundException('Application status not found');
      return statusesArray;
    }
    return this.applications;
  }

  findById(id: number) {
    const application = this.applications.find(
      (application) => application.id === id,
    );

    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  create(createApplicationDto: CreateApplicationDto) {
    const applicationsByHighestId = [...this.applications].sort(
      (a, b) => b.id - a.id,
    );
    const newApplication = {
      id: applicationsByHighestId[0].id + 1,
      ...createApplicationDto,
    };

    this.applications.push(newApplication);
    return newApplication;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    this.applications = this.applications.map((application) => {
      if (application.id === id) {
        return { ...application, ...updateApplicationDto };
      }
      return application;
    });

    return this.findById(id);
  }

  delete(id: number) {
    const removedUser = this.findById(id);
    this.applications = this.applications.filter(
      (application) => application.id !== id,
    );

    return removedUser;
  }

  findAllWhere(searchQuery: string, columnName: string, sortField: string) {
    const findApplications = [...this.applications];

    const sortedApplications = sortByFieldname(findApplications, sortField);

    let searchedApplications: Application[];

    if (!columnName)
      searchedApplications = searchByQuery(sortedApplications, searchQuery);
    else
      searchedApplications = searchByQueryInField(
        sortedApplications,
        searchQuery,
        columnName,
      );

    return searchedApplications;
  }
}
