/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomeworksService } from './homeworks.service';

describe('HomeworksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeworksService]
    });
  });

  it('should ...', inject([HomeworksService], (service: HomeworksService) => {
    expect(service).toBeTruthy();
  }));
});
