import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { emailOrPhoneRequired } from "../shared/customerror.directive";

@Component({
  selector: "app-jobportal",
  templateUrl: "./jobportal.component.html",
  styleUrls: ["./jobportal.component.css"]
})
export class JobportalComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  jobForm = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: [""],
    contacts: this.fb.group({
      contactType: ["-1", [emailOrPhoneRequired()]],
      email: [""],
      phone: [""]
    }),
    skills: this.fb.array([])
  });
  preview: string = "";
  save() {
    this.preview = JSON.stringify(this.jobForm.value);
  }
  get skillsForms() {
    return this.jobForm.get("skills") as FormArray;
  }
  get firstName() {
    return this.jobForm.get("firstName");
  }
  get contactType() {
    return this.jobForm.get("contacts.contactType");
  }
  getProgramingLagnuage(index: number) {
    return this.skillsForms.at(index).get("programLanguage");
  }

  addASkillFormGroup() {
    this.skillsForms.push(
      this.fb.group({
        programLanguage: [, [Validators.required]],
        experience: [0]
      })
    );
  }

  removeSkillFormGroup(index: number) {
    this.skillsForms.removeAt(index);
  }
  sampleSetValues() {
    this.jobForm.setValue({
      firstName: "naveen",
      lastName: "Bommidi",
      contacts: {
        contactType: "email",
        email: "naveen@test.com",
        phone: "9876543210"
      },
      skills: [
        {
          programLanguage: "AAA",
          experience: "12"
        },
        {
          programLanguage: "BBB",
          experience: "12"
        }
      ]
    });
  }
  samplePatchValues() {
    this.jobForm.patchValue({
      firstName: "naveen",
      contacts: {
        phone: "8908908901"
      }
    });
  }
}
